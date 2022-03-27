import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const GroupReply = () => {
  const { no,num } = useParams();

  
  const[Grouprepdatas,setGrouprepdata]=useState(null);
  const[Repdatas,setRepdata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin,setIslogin]=useState();
  const [issession,setissession]=useState();
  const[contentCnt, setContentCnt] = useState(0);

  function Delete(num){
    if(window.confirm("댓글을 삭제하시겠습니까?")){  
      axios.delete(`http://localhost:8085/deleteGroupRep/${num}`)
         .then(window.location='/communityGroup/'+no).catch(err=>console.log(err))

    }
  }

     const [rg_name,setrg_name]=useState(''); //댓글쓴 이름
      const[rg_content,setrg_content]=useState('');
   

      
      const handler_content=(e)=>{ //입력한 댓글내용
        setrg_content(e.target.value);
        setContentCnt(e.target.value.length);
      }
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      
      const rg_date= year + '-' + month  + '-' + day;

      console.log(rg_content,rg_date);

      function Update(num){
     
        console.log(rg_content)
        if(rg_content!==''){
       
        axios.put(`http://localhost:8085/updateGroupRep/${num}`,null,{
          params:{
         
            'rg_content':rg_content,
          }
        })
        .then(
          
          window.location='/communityGroup/'+no//성공시 목록으로 돌아가기
        )
        }else{alert('입력되지않았습니다');}
      }

      const submit=()=>{
        if(rg_content!==''){ //내용입력시에만 추가가 가능하도록설정
          axios.post(`http://localhost:8085/addGroupRep/${no}`,null,{
          params:{
            'rg_no':no,
            'rg_content':rg_content,
            'rg_name':rg_name,
            'rg_date':rg_date
           
          }
          
        })
  
        .then(res=>{
          console.log(res)
          console.log(res.data.n_title)
          console.log(res.data.n_content)
          console.log(res.data.rg_name)
         
          window.location='/communityGroup/'+no;//성공시 목록으로 돌아가기
        })
        .catch()
      }else{ alert('입력되지않았습니다');}
    }
  
    useEffect(()=>{
      const fetchGroup=async()=>{
          try {
              //error 와 notice 를 초기화
              setError(null);
              setGrouprepdata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get(`http://localhost:8085/group/repnum/${no}`);
              console.log(response.data);
              setGrouprepdata(response.data);
           
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchGroup();
  
},[no]);

console.log(isLogin);

      useEffect(()=>{ 
        if(sessionStorage.getItem('m_name')===null &&localStorage.getItem('m_name')===null){
          setIslogin(false);
        }else if(sessionStorage.getItem('m_name')==='manager' ||localStorage.getItem('m_name')==='manager'){
          setIslogin(true);
        
        }
        else{setIslogin(true);}
      },[isLogin]);

      
      useEffect(()=>{
        //댓글작성자 닉네임을 현재 로그인한 닉네임에서 가져오기
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



if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Repdatas) return null;

  return (
      <div id='replyAll'>
        {/* 댓글 갯수 같이 출력 */}
         <p>댓글 {Grouprepdatas}</p> 
        <div id='replyRegi'>
        {(isLogin)?
        <>
        <input type="text" onChange={(e)=>handler_content(e)}id="rg_content" name="rg_content" value={rg_content} maxLength={300} />
        <span id='countergroup'>{contentCnt}/300</span>
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

                  <p>{Repdata.rg_content}</p>
 
                  <p>{Repdata.rg_name} | {Repdata.rg_date}</p>
                  {
            ((sessionStorage.getItem('m_name'))===Repdata.rg_name||(localStorage.getItem('m_name'))===Repdata.rg_name) ?
                  // 해당 댓글 작성자만 삭제 수정버튼이 보이도록 설정
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
      </>:
      <><p>로그인후 확인가능합니다</p></>
              }
      </div>
    </div>
  );
};



export default GroupReply;