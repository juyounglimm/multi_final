import React, {useEffect, useState} from 'react';
import './GroupWriting.scss';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsChevronRight} from "react-icons/bs";


// eslint-disable-next-line
const GroupWriting = () => {

    const [g_title,setg_title] =useState('')
    
    const [g_subtitle,setg_subtitle] =useState('')
    const[g_content,setg_content]=useState('')
    const[g_tag,setg_tag]=useState('')
    const [g_img,setg_img]=useState('')
    const [g_name,setg_name]=useState('')
    const [issession,setissession]=useState(); //로그인 일반로그인, 로그인유지 여부 확인
    
    const handleg_title=(e)=>{ //입력된 제목 내용
      setg_title(e.target.value)
      console.log(g_title);
     
    }

    const handleg_subtitle=(e)=>{ //입력된 소제목내용
      setg_subtitle(e.target.value)
      console.log(g_subtitle);
    }
    const handleg_content=(e)=>{ //입력된 글내용
      setg_content(e.target.value)
      console.log(g_content);
    }

    const handleg_tag=(e)=>{
      setg_tag(e.target.value)
      //프로젝트, 스터디 선택에 따라 해당 이미지 변경
      if(e.target.value==='프로젝트'){
      setg_img('https://cdn.discordapp.com/attachments/946306018705563671/953159160688680980/002d941d11a3f521.png') }
      else if(e.target.value==='스터디'){
       setg_img('https://cdn.discordapp.com/attachments/946306018705563671/953159083479941141/2_.png')
      }

    }
         
    const submit=()=>{
     
      //입력되지 않을시 글추가가 되어지지 않음
      if(g_title===''||g_subtitle===''||g_content===''||g_tag===''||g_tag==='주제')
      {alert('제목,소제목,내용,카테고리 모두 입력해주세요')}
      else{
        //글추가
        axios.post(`http://localhost:8085/addgroup`,null,{
        params:{
          'g_name':g_name,
          'g_title':g_title,
          'g_subtitle':g_subtitle,
          'g_content':g_content,
          'g_img':g_img,
          'g_tag':g_tag
         
        }
      })
      .then(res=>{
        console.log(res)
        document.location.href=`/communityGroup`;//성공시 목록으로 돌아가기
      })
      .catch()
    }
    }

    useEffect(()=>{
      //일반로그인시 세션으로 저장되고, 로그인 유지시 로컬스토리지에 저장이 되기 때문에
      //로그인된 닉네임을 가져오기 위함
      if(sessionStorage.getItem('m_name')===null || localStorage.getItem('m_name')!==null){
        setissession(true);setg_name(localStorage.getItem('m_name'));
      }else if(sessionStorage.getItem('m_name')!==null ||localStorage.getItem('m_name')!==null){
        setissession(false); setg_name(sessionStorage.getItem('m_name'));
       
      }
      //글쓰기 형식에 기본 양식 출력되도록
      setg_content('1. 유형: 온라인/오프라인\n\r2. 장소/시간(온라인인 경우에는 어떻게 진행할지 써주세요 ex. 줌):\n\r3. 인원, 역할:\n\r4. 사용 기술:\n\r5. 기간:');
   
    },[issession]);
  
    return (
      
      <div id='groupWritingAll'>
         <p className='groupTitle'><BsChevronRight/> 모임찾기</p>
        <Form className='writingForm'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" onChange={(e)=>handleg_title(e)} placeholder="글 제목을 입력해주세요" />
          </Form.Group>
          <Form.Group id='writingSub' controlId="exampleForm.ControlTextarea1">
            <Form.Control className='writingSubTitle' onChange={(e)=>handleg_subtitle(e)} type="text" placeholder='소제목 입력' />
            <Form.Select className='writingSelect' onChange={(e)=>handleg_tag(e)} aria-label="Default select example">
              <option>주제</option>
              <option value="스터디" >스터디</option>
              <option value="프로젝트">프로젝트</option>
            
            </Form.Select>
          </Form.Group>
            <Form.Control as='textarea' onChange={(e)=>handleg_content(e)} className='writingText' type="text" placeholder="내용을 입력해주세요" value={g_content} maxLength={900}/>
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
            등록
          </Button>
        </div>
      </div>
  );
}

export default GroupWriting;