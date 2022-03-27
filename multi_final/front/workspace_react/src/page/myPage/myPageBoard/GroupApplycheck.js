import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table} from 'react-bootstrap';
import axios from 'axios';
import './GroupApplycheck.scss'

function GroupApplycheck(props) {
    const { g_no } = useParams();
    const[Groupapplydatas,setGroupapplydata]=useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
const [a_auth,seta_auth]=useState('');
const[m_name,setm_name]=useState('');
useEffect(()=>{
    if(sessionStorage.getItem('m_name')===null || localStorage.getItem('m_name')!==null){
     setm_name(localStorage.getItem('m_name'));
    }else if(sessionStorage.getItem('m_name')!==null ||localStorage.getItem('m_name')===null){
      setm_name(sessionStorage.getItem('m_name'));
     
    }
   
  },[]);

const authcheck=(a)=>{
    console.log(a);
    seta_auth('승인');
    axios.put(`http://localhost:8085/update/authcheck/${g_no}`,null,{
        params:{
          'a_auth':'승인',
          'a_no':a,
        
        }
      })
      .then(
        seta_auth('승인'), //승인버튼 클릭시 승인처리완료로 변경되도록 함
        window.location=`/myPageBoard/${m_name}`//성공시 목록으로 돌아가기
       
      )
      
}

  useEffect(()=>{
    const fetchGroup=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:8085/group/apply/${g_no}`);
          setGroupapplydata(response.data);
     
        }catch(e){
          setError(e);
      }
      setLoading(false);
    
  
};
fetchGroup();

 },[g_no]);


 
 if (loading) return <div>로딩중..</div>;
 if (error) return <div>에러가 발생했습니다</div>;
if (!Groupapplydatas) return null;
    return (
        <div id='myPageMain'>
            <Sidebar /> 
            <div id='board'>
     
                    <Table className='myPageTable'>
                        <thead>
                            <tr>
                                <th id="a_name">닉네임</th>
                                <th id="a_email">이메일</th>
                                <th id="a_content">내용</th>
                                <th>승인</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {Groupapplydatas.map((Groupapplydata) => (
                            <tr key={Groupapplydata.a_gno}>
                                <td id="a_name1">{Groupapplydata.a_name}</td>
                                <td id="a_email1">
                                    {Groupapplydata.a_email}
                                 </td>
                                <td id="a_content1">
                                    {Groupapplydata.a_content}
                                </td>
                                <td>
                                    { Groupapplydata.a_auth!=='승인'?
                                 <input type="button" value="승인체크" id="applybutton" onClick={()=>authcheck(Groupapplydata.a_no)}/>
                                    : '승인처리완료'
                                    }

                                </td>
                            
                            </tr>
                            ))}
                        </tbody>
                    </Table>
              
                
           
            </div>
        </div>
    );
}

export default GroupApplycheck;
