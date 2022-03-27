package com.finalp.apply;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;



@Mapper
public interface ApplyMapper {
	@Select("select * from itp_apply where a_gno=#{g_no}")
	public List<ApplyDTO> getgroupapplyList(@Param("g_no") int g_no);
	
	@Insert("INSERT INTO itp_apply(a_name,a_email,a_content,a_gno,g_name,a_auth) values(#{a_name},#{a_email},"
			+ "#{a_content},#{a_gno},#{g_name},#{a_auth})")
	int insertGroupapply(
			@Param("a_name") String a_name,
			@Param("a_email") String a_email,
			@Param("a_content") String a_content,
			@Param("a_gno") int a_gno,
			@Param("g_name") String g_name,
			@Param("a_auth") String a_auth
			
			);
	
	@Select("select a.*,g.g_title from itp_apply a inner join itp_group g on a.a_gno=g.g_no where a_name=#{m_name}")
	List<ApplyDTO> getmygroupapplyList(@Param("m_name") String m_name);
	
	//수정
    @Update("UPDATE itp_apply SET a_auth=#{a_auth} WHERE a_no= #{a_no} and a_gno=#{a_gno}")
    int updateauthcheck(
            @Param("a_gno") int a_gno,
            @Param("a_auth") String a_auth,
            @Param("a_no") int a_no
        );
	
}
