package com.app.dto;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonProperty;

//class Result<T>{
//	private T data;
//
//	public T getData() {
//		return data;
//	}
//
//	public void setData(T data) {
//		this.data = data;
//	}
//
//}

public class ResponseDTO<T> {
	private HttpStatus status;
	private String message;
	@JsonProperty("data")
	private T result;
	
	public ResponseDTO() {
		System.out.println("in " + getClass().getName() );
	}

	public ResponseDTO(HttpStatus status, String message, T result) {
		super();
		this.status = status;
		this.message = message;
		this.result = result;
	}

	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getResult() {
		return result;
	}
	public void setResult(T result) {
		this.result = result;
	}
		
	@Override
	public String toString() {
		return "ResponseDTO [status=" + status + ", message=" + message + ", result=" + result + "]";
	}

}
