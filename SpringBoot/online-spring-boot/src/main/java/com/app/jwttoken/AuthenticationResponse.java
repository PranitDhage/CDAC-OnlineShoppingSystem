package com.app.jwttoken;

public class AuthenticationResponse {
	public final String jwt;

	public AuthenticationResponse(String jwt) {
		this.jwt = jwt;
	}

	public String getJwt() {
		return jwt;
	}

	@Override
	public String toString() {
		return jwt;
	}
	
}
