import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";

import api from '../../config/api';

@inject(HttpClient)
export class ApplicantService {
    private http:HttpClient;
    contacts = [];
    private urls = {
        getAllApplicantUrl : `${api.dev}/api/Applicant/GetAll`,
        getOneApplicantUrl :`${api.dev}/api/Applicant/GetOne?id=`,
        createNewApplicantUrl : `${api.dev}/api/Applicant/Save`,
        updateApplicantUrl : `${api.dev}/api/Applicant/Update`,
        deleteApplicantUrl : `${api.dev}/api/Applicant/Delete?id=`,
    }

    constructor(http:HttpClient) {
        this.http = http;
    }

    getApplicants() {
        let promise = new Promise((resolve, reject) => {
            this.http
                .get(this.urls.getAllApplicantUrl)
                .then(data => {
                    this.contacts = JSON.parse(data.response);
                    resolve(this.contacts)
                }).catch(err => reject(err));
        });
        return promise;
    }

    createApplicant(applicant) {
        let promise = new Promise((resolve, reject) => {
            console.log("in service", applicant);
            this.http
                .post(this.urls.createNewApplicantUrl, applicant)
                .then(data => {
                    let newContact = JSON.parse(data.response);
                    resolve(newContact);
                }).catch(err => reject(err));
        });
        return promise;
    }

    getOneApplicant(id) {
        let promise = new Promise((resolve, reject) => {
            this.http
                .get(`${this.urls.getOneApplicantUrl+id}`)
                .then(response => {
                    let contact = JSON.parse(response.response);
                    resolve(contact);
                }).catch(err => reject(err))
        });
        return promise;
    }

    deleteApplicant(id) {
        let promise = new Promise((resolve, reject) => {
            this.http
                .delete(`${this.urls.deleteApplicantUrl+id}`)
                .then(res => {
                    let response = JSON.parse(res.response);
                    resolve(response);
                })
                .catch(err => reject(err));
        });
        return promise;
    }

    updateApplicant(applicant) {
        let promise = new Promise((resolve, reject) => {
            this.http
                .put(this.urls.updateApplicantUrl, applicant)
                .then(response => {
                    let contact = JSON.parse(response.response);
                    resolve(contact);
                }).catch(err => reject(err));
        });
        return promise;
    }
}