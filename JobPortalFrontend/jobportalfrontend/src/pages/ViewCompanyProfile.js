import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../api";

function ViewCompanyProfile() {

  const { email } = useParams();

  const [company, setCompany] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    fetchCompany();

  }, []);

  const fetchCompany = async () => {

    try {

      const res = await API.get(
        `/company/public/company-view/${email}`
      );

      setCompany(res.data);

    }catch (err) {

      if (err.response?.status === 404) {

        toast.error(
          "This company has not created a profile yet."
        );

        navigate("/dashboard"); // Go back to previous page

      } else {

        console.error(err);

        toast.error(
          "Failed to load company profile."
        );
      }
    }
  };

  if (!company) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "rgba(255,255,255,0.08)",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          {company.profilePhotoUrl ? (
            <img
              src={`http://localhost:8080${company.profilePhotoUrl}`}
              alt="company"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                fontSize: "5rem",
              }}
            >
              🏢
            </div>
          )}

          <h1>{company.companyName}</h1>
        </div>

        <h3>📍 Location</h3>
        <p>{company.location}</p>

        <h3>🌐 Website</h3>
        <p>{company.website}</p>

        <h3>☎️ Help Number</h3>
        <p>{company.helpNumber}</p>

        <h3>🏢 About Company</h3>
        <p>{company.description}</p>
      </div>
    </div>
  );
}

export default ViewCompanyProfile;