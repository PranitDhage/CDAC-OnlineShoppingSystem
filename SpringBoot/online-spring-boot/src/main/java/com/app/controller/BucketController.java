package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.service.AmazonClient;

@RestController
@RequestMapping("/storage")
public class BucketController {

	@Autowired
	private AmazonClient amazonClient;

	@Autowired
	BucketController(AmazonClient amazonClient) {
		this.amazonClient = amazonClient;
	}

//    @PostMapping("/uploadFile")
	public String uploadFile(MultipartFile file) {
		return this.amazonClient.uploadFile(file);
	}

//    @DeleteMapping("/deleteFile")
	public String deleteFile(String fileUrl) {
		return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
	}

	@DeleteMapping("/deleteFile")
	public String delete(@RequestPart(value = "url") String fileUrl) {
		return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
	}

}