import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const GroupReply = () => {
  const { no,num } = useParams();
  const navigate = useNavigate();
  
 
  const[Repdatas,setRepdata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin,setIslogin]=useState();
  
  function Delete(num){
       
    axios.delete(`http://localhost:8085/deleteGroupRep/${num}`)
         .then(navigate('/communityGroup/'+no)).catch(err=>console.log(err))

      }
  

     // const [r_name,setr_name]=useState(''); //댓글쓴 이름
      const[rg_content,setrg_content]=useState('');
      const logir_name=sessionStorage.getItem('m_name'); //로그인했을때 닉네임

      
      const handler_content=(e)=>{
        setrg_content(e.target.value)
      }
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      
      const rg_date= year + '-' + month  + '-' + day;

      console.log(rg_content,rg_date);

      function Update(num){
     
        console.log(rg_content)
        
       
        axios.put(`http://localhost:8085/updateGroupRep/${num}`,null,{
          params:{
         
            'rg_content':rg_content,
          }
        })
        .then(
          
          navigate('/communityGroup/')//성공시 목록으로 돌아가기
        )
      
      }

      const submit=()=>{
      
          axios.post(`http://localhost:8085/addGroupRep/${no}`,null,{
          params:{
            'rg_no':no,
            'rg_content':rg_content,
            'rg_name':logir_name,
            'rg_date':rg_date
           
          }
          
        })
  
        .then(res=>{
          console.log(res)
          console.log(res.data.n_title)
          console.log(res.data.n_content)
         
          document.location.href=`/communityGroup/${no}`;//성공시 목록으로 돌아가기
        })
        .catch()
      }
  
      useEffect(()=>{
        if(sessionStorage.getItem('m_name')===null &&localStorage.getItem('m_name')===null){
          setIslogin(false);
        }else if(sessionStorage.getItem('m_name')==='manager'){
          setIslogin(true);
        
        }
        else{setIslogin(true);}
      },[isLogin]);

  useEffect(()=>{
      const fetchCom=async()=>{
          try {
              //error 와 notice 를 초기화
              setError(null);
              setRepdata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get(`http://localhost:8085/group/rep/${no}`);
              console.log(response.data);
              setRepdata(response.data);
              //setr_name(response.data[0].r_name);
            
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchCom();
  
},[no]);


console.log(logir_name);
if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Repdatas) return null;

  return (
      <div id='replyAll'>
        <div id='replyRegi'>
        {(isLogin)?
        <>
        <input type="text" onChange={(e)=>handler_content(e)}id="rg_content" name="rg_content" value={rg_content} />
        <button value="등록하기" onClick={()=>submit()}>
          등록하기
        </button>
        </>
        :
        <></>
        }
        </div>
        <div id='replyBottom'>
        {Repdatas.map((Repdata,index) => (
          <Table>
            <tbody>
              <div key={index} className='replyContent'>

                  <p>{Repdata.rg_content}</p>
                  <p>{Repdata.rg_name} | {Repdata.rg_date}</p>
                  {
            ((sessionStorage.getItem('m_name'))===Repdata.rg_name||(localStorage.getItem('m_name'))===Repdata.rg_name) ?
                  <div>
                  <button value="삭제" onClick={()=>Delete(Repdata.rg_rno)} >
                    삭제
                  </button>
                  <button value="수정" onClick={()=>Update(Repdata.rg_rno)} >
                    수정
                  </button>
                  </div>
                  :
                  <></>
                }
                </div>
            </tbody>
          </Table>
        ))}
      </div>
    </div>
  );
};



export default GroupReply;