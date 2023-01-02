import Bundler from '../bundler'
import Preview from './preview'
import CodeEditor from './code-editor'
import { useState, useEffect } from 'react'
import Resizable from './resizable'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await Bundler(input)
      setCode(output.code)
      setErr(output.error)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return <div>
    <Resizable direction='vertical'>
      <div style={ {
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
      } }>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue='// code'
            onChange={ value => setInput(value) }
          />
        </Resizable>
        <Preview code={ code } error={ err } />
      </div>
    </Resizable>
  </div>
}

export default CodeCell