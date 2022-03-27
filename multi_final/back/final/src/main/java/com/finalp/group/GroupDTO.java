package com.finalp.group;


import lombok.Data;

@Data
public class GroupDTO {
	private int g_no;//번호
	private String g_name;//작성자
	private String g_title;//글제목
	private String g_subtitle;//소제목
	private String g_content;//내용
	private String g_img;//사진
	private String g_tag;//태그
	
	public GroupDTO() {
		// TODO Auto-generated constructor stub
	}
	public GroupDTO(int g_no, String g_name, String g_title, String g_subtitle, String g_content, String g_img, 
			String g_tag) {
		this.g_no=g_no;
		this.g_name=g_name;
		this.g_title=g_title;
		this.g_subtitle=g_subtitle;
		this.g_content=g_content;
		this.g_img=g_img;
		this.g_tag=g_tag;
	}
}
