package com.finalp.group;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class GroupController {
	@Autowired
	private GroupMapper mapper;
	
	@Autowired
	public GroupController(GroupMapper mapper) {
		this.mapper = mapper;
	}
	
	@GetMapping("/group")
	public int getgroupListAll() {
		return mapper.getgroupListAll();
	}
	
	@GetMapping("/group/{g_no}")
	public List<GroupDTO> getgroupdetailList(@PathVariable("g_no") int g_no) {
		return mapper.getgroupdetailList(g_no);
	}
	
	//전체내용조회
	@GetMapping("/group/listAll")
	public List<GroupDTO> getgroupListAlll(){
		return mapper.getgroupListAlll();  
	}
	
	//아이디에 해당하는 내용만 조회
	@GetMapping("/mypage/group")
	public List<GroupDTO> getmygroupList(@RequestParam("m_name") String m_name){
		return mapper.getmygroupList(m_name);  
	}
	    //최신순 조회
		@GetMapping("/group/recent")
		public List<GroupDTO> getgroupListmain(){
			return mapper.getgroupListmain();
		}
		
		//추가
		@RequestMapping(value="/addgroup",method=RequestMethod.POST)
	     int insertGroup(
	    		 @RequestParam(value="g_name",required=false) String g_name,
				@RequestParam(value="g_title") String g_title,
				@RequestParam(value="g_subtitle",required=false) String g_subtitle,
				@RequestParam(value="g_content",required=false) String g_content,
				@RequestParam(value="g_img",required=false) String g_img,
				@RequestParam(value="g_tag",required=false) String g_tag
				) {
			
			return mapper.insertGroup(g_name,g_title,g_subtitle,g_content,g_img,g_tag);
		}
		
		
		//모임찾기 글수정
		@PutMapping("/updateGroup/{g_no}")
		public int updateGroup(@PathVariable("g_no") int g_no,
				@RequestParam(value="g_title",required=false) String g_title,
				@RequestParam(value="g_subtitle",required=false) String g_subtitle,
				@RequestParam("g_content") String g_content,
				@RequestParam(value="g_tag",required=false) String g_tag
		
				) { 
			return mapper.updateGroup(g_no,g_title,g_subtitle,g_content,g_tag);
		
		}
		
        //모임찾기 글삭제
		@DeleteMapping("/deleteGroup/{g_no}")
		public int deleteGroup(@PathVariable("g_no") int g_no) {
			return mapper.deleteGroup(g_no);
		}

}
