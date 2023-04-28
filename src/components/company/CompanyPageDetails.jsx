import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import CompanyNavbar from "./navbars/CompanyNavbar";

import styles from "./company.module.scss";

import parse from "html-react-parser";
import { db } from "../../firebase";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import JobItem from "../content/JobItem";
import { useNavigate, useParams } from "react-router";
import Contacts from "./contacts/Contacts";
import draftToHtml from "draftjs-to-html";

const CompanyPage = () => {
  const params = useParams();
  const currentUser = useSelector((state) => state.loginSlice.currentUser);
  const id = params.id;
  const [info, setInfo] = useState();
  const [jobs, setJobs] = useState([]);
  const [companyContacts, setCompanyContacts] = useState();

  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const docRef = doc(db, "companies", id);
        const companyDoc = await getDoc(docRef);
        setInfo(companyDoc.data());
        setCompanyContacts({
          address: companyDoc.data().address,
          email: companyDoc.data().email,
          phone: companyDoc.data().phone,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    getCompanyInfo();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, "jobs"), where("companyId", "==", id));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ item: doc.data(), id: doc.id });
        });
        setJobs(data);
      } catch (error) {}
    };

    getData();
  }, [currentUser?.displayName, id]);

  return (
    <div className={styles.outContiner}>
      <div className="container">
        <div className={styles.company}>
          <div>
            <CompanyNavbar {...info} />
          </div>

          <div> {parse(`${draftToHtml(info?.aboutUs)}`)}</div>

          <h2>Active Jobs</h2>
          {jobs.map((j) => (
            <JobItem item={j.item} id={j.id} key={uuid()} />
          ))}
        </div>
        <Contacts contacts={companyContacts} />
      </div>
    </div>
  );
};

export default CompanyPage;
