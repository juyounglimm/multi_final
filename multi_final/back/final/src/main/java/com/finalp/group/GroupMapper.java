package com.finalp.group;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;




@Mapper
public interface GroupMapper {
	@Select("select count(*) from itp_group")
	int getgroupListAll();
	

	@Select("select * from itp_group where g_no=#{g_no}")
	public List<GroupDTO> getgroupdetailList(@Param("g_no") int g_no);
	
	
	@Select("select * from itp_group orders where g_no between (select count(*) from itp_group)-(6*#{page}-1) "
			+ "and (select count(*) from itp_group)-(6*(#{page}-1))")
	List<GroupDTO> getgroupList(@Param("page") String page);
	
	@Select("select * from itp_group where g_name=#{m_name}")
	List<GroupDTO> getmygroupList(@Param("m_name") String m_name);
	
	
	@Select("select * from itp_group order by g_no desc")
	List<GroupDTO> getgroupListAlll();
	
	//메인화면에 보여질 최신순 3개
	@Select("select * from itp_group order by g_no desc limit 3")
	public List<GroupDTO> getgroupListmain();
	
	//제목으로 검색
	@Select(
			"select * from itp_group orders where g_title LIKE '%${search}%' ")
	List<GroupDTO> getGroupListSearch(@Param("search") String search);
	
	//글쓰기  제목 소제목 카테고리 파일 내용 작성자

	@Insert("INSERT INTO itp_group(g_name,g_title,g_subtitle,g_content,g_img,g_tag) values(#{g_name},#{g_title},"
			+ "#{g_subtitle},#{g_content},#{g_img},#{g_tag})")
	int insertGroup(
			@Param("g_name") String g_name,
			@Param("g_title") String g_title,
			@Param("g_subtitle") String g_subtitle,
			@Param("g_content") String g_content,
			@Param("g_img") String g_img,
			@Param("g_tag") String g_tag
			
			);
	
	//수정
	@Update("UPDATE itp_group SET g_title = #{g_title}, g_subtitle=#{g_subtitle}, g_content= #{g_content}"
			+ ",g_tag=#{g_tag} WHERE g_no= #{g_no}")
	int updateGroup(
			@Param("g_no") int g_no,
			@Param("g_title") String g_title,
			@Param("g_subtitle") String g_subtitle,
			@Param("g_content") String g_content,
			@Param("g_tag") String g_tag
		);
	
	//삭제
	@Delete("DELETE FROM itp_group WHERE g_no = #{g_no}")
	int deleteGroup(@Param("g_no") int g_no);
	

	
	
	
}