import React, {useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BsChevronRight} from "react-icons/bs";


// eslint-disable-next-line
const GroupApply = () => {
    const { no } = useParams();
    const [issession,setissession]=useState();
    const[g_name,setg_name]=useState('');
    const[g_email,setg_email]=useState('');
    const[g_content,setg_content]=useState('');
    const[g_nameorigin,setg_nameorigin]=useState('');

    
    const handleg_content=(e)=>{
      setg_content(e.target.value)
      console.log(g_content);
    }

    useEffect(()=>{
        const fetchGroup=async()=>{
            try {
          
                const response=await axios.get(`http://localhost:8085/group/${no}`);
                console.log(response.data);

                setg_nameorigin(response.data[0].g_name); //원글 작성자닉네임
             
            }catch(e){
           
            }
   
          
        
    };
    fetchGroup();
    
  },[no]);
  
  
 
    useEffect(()=>{
      //로그인 된 닉네임, 이메일 저장
        if(sessionStorage.getItem('m_name')===null || localStorage.getItem('m_name')!==null){
          setissession(false);setg_name(localStorage.getItem('m_name')); setg_email(localStorage.getItem('loginemail'));
        }else if(sessionStorage.getItem('m_name')!==null ||localStorage.getItem('m_name')===null){
          setissession(true); setg_name(sessionStorage.getItem('m_name'));
          setg_email(sessionStorage.getItem('loginemail'));
         
        }
       
      },[issession]);

    const submit=()=>{

     console.log(g_content);
      
      
      axios.post(`http://localhost:8085/addgroupapply`,null,{
        params:{
            'a_name':g_name,
            'a_email':g_email, 
            'a_content':g_content,
            'a_gno':no,
            'g_name':g_nameorigin,
            'a_auth':'확인중',
         
         
        }
      })
      .then(res=>{
        console.log(res)
        console.log(res.data.g_title)
        console.log(res.data.g_content)
       
        document.location.href=`/communityGroup`;//성공시 목록으로 돌아가기
      })
      .catch()
    }

    return (
      
      <div id='groupWritingAll'>
         <p className='groupTitle'><BsChevronRight/> 모임찾기<BsChevronRight/> 신청하기</p>
        <Form className='writingForm'>
     
            <Form.Control as='textarea' onChange={(e)=>handleg_content(e)} className='writingText' type="text" placeholder="내용을 입력해주세요" />
        </Form>
        <div id='button'>
          <Link to='/communityGroup'>
            <Button className='cancel me-2'>
              취소
            </Button>
          </Link>
          <Button 
          type="submit"
          className="submit-button"
          onClick={()=>submit()}
          >
            신청하기
          </Button>
        </div>
      </div>
  );
}

export default GroupApply;