
import { useState , useCallback,useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length,setlength] = useState(8)
  const[Number,Numberallowed]=useState(false)
  const[character,characterallowed]=useState(false)
  const[password,setpassword]=useState("")

const passwordRef=useRef()


  const passwordgenerator = useCallback(() =>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(Numberallowed) str +="0123456789"
      if(characterallowed) str +="!@#$%^&*-_+={}[]~`"

      for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random() *str.length + 1)
        pass += str.charAt(char)
      }
      setpassword(pass)
  },[length,character,character])
  const copypassclipboard=useCallback(() =>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,6);

  },[password])

  useEffect(() => {passwordgenerator()} ,[length,Number,character,passwordgenerator])

  return (
    <>
    <div className=' w-full flex-wrap max-w-screen-md mx-auto shadow-md rounded-lg px-4 my-8  p-6 text-orange-500 bg-gray-500'>
      <h1 className=' text-white text-center text-xl py-2'>Password Generator</h1>
      <div className='flex flex-wrap shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' 
        ref={passwordRef}
        value={password} className=' outline-none w-full py-2 px-3' placeholder='password' readOnly />
        <button onClick={copypassclipboard}  className=' outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>
      <div className=' flex flex-wrap text-sm gep-x-1 justify-between'>
        <div className='flex flex-wrap items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className=' cursor-pointer'
          onChange={(e) =>{setlength(e.target.value)}}
          />
          <label>Length :{length}</label>
        </div>
        <div className='flex flex-wrap items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={Number}
          id='numberinput'
          onChange={() =>{
            Numberallowed ((prev) =>!prev)
          }}
          
          />
          <label>Numbers</label>
        </div>
        <div className='flex flex-wrap items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={character}
          id='charinput'
          onChange={() =>{
            characterallowed ((prev) => !prev)
          }}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
