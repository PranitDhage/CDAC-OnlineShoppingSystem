package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SigninDTO {
	@JsonProperty("email")
	private String user_email;
	
	@JsonProperty("password")
	private String user_password;
	
	public SigninDTO() {
		System.out.println("in signinDTO const");
	}

	public SigninDTO(String user_email, String user_password) {
		super();
		this.user_email = user_email;
		this.user_password = user_password;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public String getUser_password() {
		return user_password;
	}

	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}

	@Override
	public String toString() {
		return "SigninDTO [user_email=" + user_email + ", user_password=" + user_password + "]";
	}
	
}
