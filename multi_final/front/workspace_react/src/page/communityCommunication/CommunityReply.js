import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './communityReply.scss';

const CommunityReply = () => {
  const { no,num } = useParams();
  const navigate = useNavigate();
  const[Comrepdatas,setComrepdata]=useState(null);
  const [issession,setissession]=useState();
  const[Repdatas,setRepdata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin,setIslogin]=useState();
  const[contentCnt, setContentCnt] = useState(0);
  
  function Delete(num){
    if(window.confirm("댓글을 삭제하시겠습니까?")){
      axios.delete(`http://localhost:8085/deleteRep/${num}`)
         .then(window.location='/communication/'+no).catch(err=>console.log(err))
    }
  }
  

      const [rg_name,setrg_name]=useState(''); //댓글쓴 이름
      const[r_content,setr_content]=useState('');


      
      const handler_content=(e)=>{
        setr_content(e.target.value);
        setContentCnt(e.target.value.length);
      }
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      
      const r_date= year + '-' + month  + '-' + day;

      console.log(r_content,r_date);

      function Update(num){
     
        console.log(r_content)
        if(r_content!==''){
       
        axios.put(`http://localhost:8085/updateRep/${num}`,null,{
          params:{
         
            'r_content':r_content,
          }
        })
        .then(
          
          window.location='/communication/'+no//성공시 목록으로 돌아가기
        )
        }else{alert('입력되지않았습니다');}
      }

      const submit=()=>{
        
        if(r_content!==''){
          axios.post(`http://localhost:8085/addRep/${no}`,null,{
          params:{
            'r_no':no,
            'r_content':r_content,
            'r_name':rg_name,
            'r_date':r_date
           
          }
          
        })
  
        .then(res=>{
          console.log(res)
          console.log(res.data.n_title)
          console.log(res.data.n_content)
         
          window.location='/communication/'+no;//성공시 목록으로 돌아가기
        })
        .catch()
      }else{ alert('입력되지않았습니다');}
    }
    useEffect(()=>{
      const fetchGroup=async()=>{
          try {
              //error 와 notice 를 초기화
              setError(null);
              setComrepdata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get(`http://localhost:8085/com/repnum/${no}`);
              console.log(response.data);
              setComrepdata(response.data);
           
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchGroup();
  
},[no]);


      useEffect(()=>{
        if(sessionStorage.getItem('m_name')===null &&localStorage.getItem('m_name')===null){
          setIslogin(false);
        }else if(sessionStorage.getItem('m_name')==='manager'){
          setIslogin(true);
        
        }
        else{setIslogin(true);}
      },[isLogin]);


      useEffect(()=>{
        if(sessionStorage.getItem('m_name')===null || localStorage.getItem('m_name')!==null){
          setissession(true);setrg_name(localStorage.getItem('m_name'));
        }else if(sessionStorage.getItem('m_name')!==null ||localStorage.getItem('m_name')!==null){
          setissession(false); setrg_name(sessionStorage.getItem('m_name'));
         
        }
       
      },[issession]);

      console.log(rg_name);
  useEffect(()=>{
      const fetchCom=async()=>{
          try {
              //error 와 notice 를 초기화
              setError(null);
              setRepdata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get(`http://localhost:8085/rep/${no}`);
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



if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Repdatas) return null;

  return (
      <div id='replyAll'>
            <p>댓글 {Comrepdatas} </p>
        <div id='replyRegi'>
        {(isLogin)?
        <>
        <input type="text" onChange={(e)=>handler_content(e)}id="r_content" name="r_content" value={r_content} maxLength={300} />
        <span id='countercom'>{contentCnt}/300</span>
        <button value="등록하기" onClick={()=>submit()}>
          등록하기
        </button>
        </>
        :
        <></>
        }
        </div>
        <div id='replyBottom'>
        {(isLogin)?
        <>
        {Repdatas.map((Repdata,index) => (
          <Table>
            <tbody>
              <div key={index} className='replyContent'>

                  <p>{Repdata.r_content}</p>
                  <p>{Repdata.r_name} | {Repdata.r_date}</p>
                  {
            ((sessionStorage.getItem('m_name'))===Repdata.r_name||(localStorage.getItem('m_name'))===Repdata.r_name) ?
                  <div>
                  <button value="삭제" onClick={()=>Delete(Repdata.r_rno)} >
                    삭제
                  </button>
                  <button value="수정" onClick={()=>Update(Repdata.r_rno)} >
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
         </>:
      <><p>로그인후 확인가능합니다</p></>
              }
      </div>
    </div>
  );
};



export default CommunityReply;