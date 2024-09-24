"use client";
import React, { useEffect, useState } from "react";
import { useDoctorStore } from "@/store/doctorStore";
import { getDoctorFilterData, getHospital } from "../../../home/action";
import MultipleImagesProps from "@/components/SinglePageImage";
import Header from "@/components/HomeComponent/Header";
import { useHospitalStore } from "@/store/hospitalStore";
import PopularDoctors from "@/components/Image";
import { useRouter } from "next/navigation";

const Hospitals = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  console.log("objectparamsparamsparams", params);
  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="hospital" className="pb-8 pt-20">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          maxWidth: "600px",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src="hospital.jpg"
            alt="Hospital Building"
            style={{ width: "150px", height: "auto", borderRadius: "8px" }}
          />
          <span
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              backgroundColor: "red",
              color: "white",
              padding: "4px 8px",
              borderRadius: "50%",
              fontWeight: "bold",
            }}
          >
            ⚡
          </span>
        </div>

        <div style={{ marginLeft: "16px" }}>
          <a href="/hospitals" className="hover:text-red-500">
            Hospital
          </a>
          {/* <h2 style={{ fontSize: '1.5em', margin: '0' }}>Hospital
          
          </h2> */}

          <h2 style={{ fontSize: "1.5em", margin: "0" }}>
            {"hospitals.label"}
            {/* <span style={{ color: 'green' }}>✔️</span> */}
          </h2>
          <p>Doctors Onboard: 15,263</p>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
          >
            <span style={{ color: "gold" }}>⭐⭐⭐⭐⭐</span>
            <span style={{ marginLeft: "8px" }}>2100 Feedback</span>
          </div>
          <p style={{ margin: "12px 0", color: "#555" }}>
            Amet consectetur adipisicing eliteiuium sete eiu tempor incidit
            utoreas...
          </p>
          {/* <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}>Add Feedback</button>
            <button style={{ padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white' }}>Book Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
