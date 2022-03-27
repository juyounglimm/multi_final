import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GroupReply from './GroupReply';
import axios from 'axios';
import './groupBoardDetail.scss'
import {IoChevronForwardOutline } from 'react-icons/io5';

const GroupBoardDetail = () => {
  const { no } = useParams();
  const navigate = useNavigate();
  const BackToGroupBoard = () => {
    navigate('/communityGroup');
  };
  const gotoapply=()=>{
   navigate(`/applygroup/${no}`)
  }
  const[Groupdatas,setGroupdata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [g_name,setg_name]=useState('');
  
  function Update(no){
   navigate(`/changeGroup/${no}`)
  
  }
  function Delete(no){
    if(window.confirm("게시글을 삭제하시겠습니까?")){
      axios.delete(`http://localhost:8085/deleteGroup/${no}`)
      .then(window.location='/communityGroup').catch(err=>console.log(err))
    }
  }

  

  useEffect(()=>{
      const fetchGroup=async()=>{
          try {
    
              setError(null);
              setGroupdata(null);
              setLoading(true);    
              const response=await axios.get(`http://localhost:8085/group/${no}`);
              console.log(response.data);
              setGroupdata(response.data);
             setg_name(response.data[0].g_name);
           
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchGroup();
  
},[no]);


if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Groupdatas) return null;

  return (
    <div id='groupDetailAll'>
      
      <p className='groupDetailTop'> <IoChevronForwardOutline/> <Link to='/communityGroup' style={{textDecoration:'none',color:'black'}}>모임찾기</Link></p>
     <div id='detailContentPost'>
      {Groupdatas.map((Groupdata,index) => (
      <Table>
        <tbody>
          <div key={index} className='detailBody'>
            <p className='contentTitle'>{Groupdata.g_title}
            <span id='groupnamedate'> 
            {Groupdata.g_name} | {Groupdata.g_tag}</span></p>
            </div>
          <div className='detailContent'>{Groupdata.g_content}</div>
        </tbody>
      </Table>
      ))}
     </div>
     <div id='detailButton'>
  
     {
        ((sessionStorage.getItem('m_name'))===g_name||(localStorage.getItem('m_name'))=== g_name||(sessionStorage.getItem('m_name'))==='manager'||(localStorage.getItem('m_name'))==='manager') ?
        <>
        <button className='groupDetailButton' value="목록으로" onClick={BackToGroupBoard} > 목록 </button>
      <button className='groupDetailButton' value="수정하기" onClick={()=>Update(no)} > 수정 </button>
      <button className='groupDetailButton' value="삭제하기" onClick={()=>Delete(no)} > 삭제 </button>
      </>
      :
      
      <>
      <button className='groupDetailButton' value="목록으로" onClick={BackToGroupBoard} > 목록 </button>
     
      </>
     }
     
     {
        ((sessionStorage.getItem('m_name'))===null&&(localStorage.getItem('m_name'))=== null) ?
        <>
       </>
       :
       <>
      <button className='groupDetailButton' value="신청" onClick={gotoapply} > 신청 </button>  
       </>
     }
      </div>
      <GroupReply/>
    </div>
  
  );
};



export default GroupBoardDetail;