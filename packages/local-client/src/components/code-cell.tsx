import Preview from './preview'
import CodeEditor from './code-editor'
import { useEffect } from 'react'
import Resizable from './resizable'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'
import { useCumulativeCode } from '../hooks/use-cumulative-code'
import './code-cell.css'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector(state => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle])

  return <div>
    <Resizable direction='vertical'>
      <div style={ {
        height: 'calc(100% - 10px)',
        display: 'flex',
        flexDirection: 'row'
      } }>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={ cell.content }
            onChange={ value => updateCell(cell.id, value) }
          />
        </Resizable>
        <div className="progress-wrapper">
          { !bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">Loading</progress>
            </div>
          ) : (
            <Preview code={ bundle.code } error={ bundle.error } />
          ) }
        </div>
      </div>
    </Resizable>
  </div>
}

export default CodeCell