package com.finalp.apply;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;




@CrossOrigin("*")
@RestController
public class ApplyController {
	@Autowired
	private ApplyMapper mapper;
	
	@Autowired
	public ApplyController(ApplyMapper mapper) {
		this.mapper = mapper;
	}
	
	@GetMapping("/group/apply/{g_no}")
	public List<ApplyDTO> getgroupapplyList(@PathVariable("g_no") int g_no){
		return mapper.getgroupapplyList(g_no);  
	}
	
	//추가
	@RequestMapping(value="/addgroupapply",method=RequestMethod.POST)
     int insertGroup(
    		 @RequestParam(value="a_name",required=false) String a_name,
    		 @RequestParam(value="a_email",required=false) String a_email,
			@RequestParam(value="a_content",required=false) String a_content,
			@RequestParam(value="a_gno",required=false) int a_gno,
			@RequestParam(value="g_name",required=false) String g_name,
			@RequestParam(value="a_auth",required=false) String a_auth
			) {
		
		return mapper.insertGroupapply(a_name,a_email,a_content,a_gno,g_name,a_auth);
	}
	
	//아이디에 해당하는 내용만 조회
	@GetMapping("/mypage/applylist")
	public List<ApplyDTO> getmygroupapplyList(@RequestParam("m_name") String m_name){
		return mapper.getmygroupapplyList(m_name);  
	}
	//수정
    @PutMapping("/update/authcheck/{a_gno}")
    public int updateauthcheck(@PathVariable("a_gno") int a_gno,
            @RequestParam(value="a_no",required=false) int a_no,
            @RequestParam(value="a_auth",required=false) String a_auth

            ) { 
        return mapper.updateauthcheck(a_gno,a_auth,a_no);
    }

}
