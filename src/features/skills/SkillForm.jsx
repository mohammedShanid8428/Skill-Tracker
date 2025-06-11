import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const skillForm=({editData,setEditDate})=>{
  const[name,setName]=useState("")
  const[level,setLevel]=useState("Beginner");
  const dispatch=useDispatch();

  useEffect(()=>{
    if(editData){
      setName(edit)
    }
  })
}

function SkillForm() {
  return (
    <div>SkillForm</div>
  )
}

export default SkillForm