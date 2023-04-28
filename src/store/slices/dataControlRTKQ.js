import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { v4 as uuid } from "uuid";
import { db } from "../../firebase";

export const dataApi = createApi({
  reducerPath: "dataApi",

  tagTypes: ["Jobs", "Info", "Cv", "Companies"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getFiltredWhere: builder.query({
      async queryFn({ limits, filterHints }) {
        try {
          const fetchData = await getDocs(
            query(collection(db, "jobs"), ...filterHints, limit(limits))
          );
          const data = [];
          fetchData.forEach((doc) => {
            data.push({ item: doc.data(), id: doc.id });
          });
          return { data };
        } catch (e) {
          console.log(e, "error");
          return { error: e };
        }
      },
      providesTags: ["Jobs"],
    }),
    getFiltredIN: builder.query({
      async queryFn({ limits, filterHints }) {
        try {
          const fetchData = await getDocs(
            query(collection(db, "jobs"), ...filterHints, limit(limits))
          );
          const data = [];
          fetchData.forEach((doc) => {
            data.push({ item: doc.data(), id: doc.id });
          });
          return { data };
        } catch (e) {
          console.log(e, "error");
          return { error: e };
        }
      },
      providesTags: ["Jobs"],
    }),
    getFiltredCompanies: builder.query({
      async queryFn({ filterHintsCompany, limits }) {
        try {
          const fetchData = await getDocs(
            query(
              collection(db, "companies"),
              ...filterHintsCompany,
              limit(limits)
            )
          );
          const data = [];
          fetchData.forEach((doc) => {
            data.push({ item: doc.data(), id: doc.id });
          });

          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Companies"],
    }),

    addJobs: builder.mutation({
      async queryFn({ job }) {
        try {
          await setDoc(doc(db, "jobs", uuid()), {
            ...job,
            date: Timestamp.now(),
          });
          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },

      invalidatesTags: ["Jobs"],
    }),
    deleteJobs: builder.mutation({
      async queryFn(id) {
        try {
          deleteDoc(doc(db, "jobs", id));
          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },

      invalidatesTags: ["Jobs"],
    }),

    getData: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "companies", id);
          const data = await getDoc(docRef);
          return data.data().aboutUs;
        } catch (e) {
          return { error: e };
        }
      },

      providesTags: ["Info"],
    }),
    updateData: builder.mutation({
      async queryFn({ id, currentInfo, update }) {
        try {
          const companyRef = doc(db, "companies", id);

          if (update) {
            await updateDoc(companyRef, {
              about: arrayRemove(update),
            });
          }

          await updateDoc(companyRef, {
            about: arrayUnion(currentInfo),
          });

          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },

      invalidatesTags: ["Info"],
    }),
    updateCompanyData: builder.mutation({
      async queryFn({ id, info }) {
        try {
          const document = doc(db, "companies", id);
          await updateDoc(document, {
            aboutUs: info,
          });
          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },

      invalidatesTags: ["Info"],
    }),

    getCv: builder.query({
      async queryFn({ id }) {
        try {
          const userRef = await doc(db, "users", id);
          const data = await getDoc(userRef);
          return { data: data.data().cvData };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Cv"],
    }),
    updateCv: builder.mutation({
      async queryFn({ id, cvData }) {
        try {
          const userRef = doc(db, "users", id);
          await updateDoc(userRef, {
            cvData: cvData,
          });
          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ["Cv"],
    }),
  }),
});
export const {
  useGetFiltredINQuery,
  useAddJobsMutation,
  useDeleteJobsMutation,
  useGetDataQuery,
  useUpdateDataMutation,
  useUpdateCompanyDataMutation,
  useGetFiltredCompaniesQuery,
  useGetCvQuery,
  useUpdateCvMutation,
  useGetFiltredWhereQuery,
} = dataApi;
export const jobApi = dataApi.reducer;
