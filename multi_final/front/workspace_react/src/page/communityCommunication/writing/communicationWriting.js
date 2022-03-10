import React, {useState} from 'react';
import './communicationWriting.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


// eslint-disable-next-line
const CommunicationWriting = () => {
  const navigate = useNavigate();

  const BackToCommunitcationBoard = () => {
    navigate("/communication");
};
     
    const [c_title,setc_title] =useState('')
    const[c_content,setc_content]=useState('')
    const[g_tag,setc_tag]=useState('')
    const c_name='User'

    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    
    const c_date= year + '-' + month  + '-' + day;

    const handlec_title=(e)=>{
      setc_title(e.target.value)
      console.log(c_title);
     
    }

   
    const handlec_content=(e)=>{
      setc_content(e.target.value)
      console.log(c_content);
    }

    const handlec_tag=(e)=>{
      setc_tag(e.target.value)
      console.log(g_tag)
    }
    const submit=()=>{
     console.log(c_title);

     console.log(c_content);
      
      
      axios.post(`http://localhost:8085/addCom`,null,{
        params:{
          'c_name':c_name,
          'c_title':c_title,
          'c_content':c_content,
          'c_date':c_date,
        
         
        }
      })
      .then(res=>{
        console.log(res)
        console.log(res.data.c_title)
        console.log(res.data.c_content)
       
        document.location.href=`/communityGroup`;//성공시 목록으로 돌아가기
      })
      .catch()
    }
   
    return (
      
 
      <div id='communityWritingAll'>
        <p className='communityTitle'>소통공간</p>
        <Form className='writingForm'>
          <Form.Group id='writingTop' controlId="exampleForm.ControlInput1">
            <Form.Select className='writingSelect' onChange={(e)=>handlec_tag(e)} aria-label="Default select example">
              <option>주제</option>
              <option value="자유" >자유</option>
              <option value="질문">질문</option>
              <option value="기타">기타</option>
            </Form.Select>
            <Form.Control type="text" onChange={(e)=>handlec_title(e)} placeholder="글 제목을 입력해주세요" />
          </Form.Group>
            <Form.Group id='writingSub' controlId="formFile">
              <Form.Control type="file" />
            </Form.Group>
            <Form.Control as='textarea' onChange={(e)=>handlec_content(e)} className='writingText' type="text" placeholder="내용을 입력해주세요" />
        </Form>
        <div id='button'>
            <Button className='cancel me-2' onClick={BackToCommunitcationBoard}>
              취소
            </Button>
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

export default CommunicationWriting;