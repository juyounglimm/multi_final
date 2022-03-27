import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../components/login/login.scss'
import axios from 'axios';
import CryptoJS from 'crypto-js';


function Login() {
    const [m_email, setmemail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const[checked,setchecked]=useState(false);
    const [isemailnull,setisemailnull]=useState(true);
    const[isPasswordnull,setispasswordnull]=useState(true);
    let sessionStorage = window.sessionStorage;
    const localStorage=window.localStorage;
    console.log(checked)
    const handlechange = (e) => {
        setchecked(!checked);
      };
      //입력되지 않은 값이 있을때 경고창이 뜨면서 다시 로그인화면으로 돌아오도록 설정
    const submitfail=()=>{
        alert('입력되지 않은 값이 있습니다.');
        window.location = '/login';
    }
    console.log(isemailnull,isPasswordnull);
    const submit=()=>{
 
            axios.post(`http://localhost:8085/member/login`,null,{
            params:{
            'm_email':m_email
            }
        })
        .then(response => {    
            console.log(response.data);
            
            const m_role=response.data[0].m_role;     
            const loginm_name=response.data[0].m_name;
            //db에 있는 패스워드 암호화 풀고 입력한 값과 비교
            //response값을 decrypto하고나서 loginpassword와 비교
            const loginpassworddb= (response.data[0].m_passwd); //db내용옮기기
            const loginpassworddbdecrypt  = CryptoJS.AES.decrypt(loginpassworddb, 'itp123');
            var decryptedData = loginpassworddbdecrypt.toString(CryptoJS.enc.Utf8);
           
            console.log('원래값풀기'+decryptedData );
            console.log(loginPassword);
         
              if((decryptedData ===loginPassword)&&(checked===false)){ //복호화 시킨 db비밀번호가 입력한 비밀번호와 같으면서 로그인유지가 체크안되었을때
                sessionStorage.setItem("loginemail", m_email);
                sessionStorage.setItem("loginPassword", response.data[0].m_passwd);//비밀번호
                sessionStorage.setItem("m_name",loginm_name); //닉네임
                sessionStorage.setItem("m_role",m_role);
                
                window.location = '/';
                 } 
                else if((decryptedData ===loginPassword)&&(checked===true)){//복호화 시킨 db비밀번호가 입력한 비밀번호와 같으면서 로그인유지가 체크되었을때
                    localStorage.setItem("loginemail", m_email);
                    localStorage.setItem("loginPassword", response.data[0].m_passwd);//비밀번호
                    localStorage.setItem("m_name", loginm_name); //닉네임
                    localStorage.setItem("m_role", m_role);
                    window.location.href='/'
                 }
                 else{
                  
                     alert('아이디나 비밀번호가 올바르지 않습니다');  
                     window.location = '/login';
                   
                 }
         })
         .catch(error => {
            console.log(error);
            window.location = '/login';
            alert('존재하지 않는 이메일입니다');  
         });
        
        
        
    }
   
    return (
        <div id='LoginAll'>
            <p className="loginTitle">로그인</p>
            <div id='LoginAll'>
                {/* form */}
                <form className="loginForm">
                    <input type="m_email" autocomplete="off"  name="email" id="inputLogin" onChange={ (e)=>{
                        setmemail(e.target.value);if(e.target.value!=='')setisemailnull(false);}} placeholder="이메일" />
                    <br />
                    <input type="password" name="pw" id="inputLogin" 
                    placeholder="비밀번호" minlength="8" maxlength="16" onChange={ (e)=>{
                        setLoginPassword(e.target.value); if(e.target.value!=='')setispasswordnull(false);}}/>                         
                    <br />
                    <div class="mb-3" className='loginCheck'>
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"   checked={checked} onChange={handlechange}/>
                        <label class="form-check-label" for="exampleCheck1">로그인 상태 유지</label>
                    </div>
                    {(isemailnull||isPasswordnull)?
                    <div>
                        <button id='btn' type="submit" onClick={()=>submitfail()} >로그인</button>     
                    </div> 
                    :
                    <div>
                        <button id='btn' type="submit" onClick={()=>submit()} >로그인</button></div>
                    }
                    <div>
                        <Link to="#passwordfind" className='loginBottom' >비밀번호 찾기 </Link>ㅣ
                        <Link to="/Register" className='loginBottom'> 회원가입 </Link>
                    </div>
                </form>
            </div>
        </div>
    );
 }

export default Login;