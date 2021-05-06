package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EditProfileDTO {
	@JsonProperty("name")
	private String user_name;
	@JsonProperty("password")
	private String user_password;
	@JsonProperty("phone")
	private String user_phone;
	
	public EditProfileDTO() {
		System.out.println("in editProfileDTO");
	}

	public EditProfileDTO(String user_name, String user_password, String user_phone) {
		super();
		this.user_name = user_name;
		this.user_password = user_password;
		this.user_phone = user_phone;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_password() {
		return user_password;
	}

	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}

	public String getUser_phone() {
		return user_phone;
	}

	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}

	@Override
	public String toString() {
		return "EditProfileDTO [user_name=" + user_name + ", user_password="
				+ user_password + ", user_phone=" + user_phone + "]";
	}

}
