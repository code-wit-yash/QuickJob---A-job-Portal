import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        experienceRequired: "",
        skillsRequired: "",
        companyEmail: "",
    });

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        try {

            const res = await API.get(`/company/job/${id}`);

            setForm({
                title: res.data.title || "",
                description: res.data.description || "",
                location: res.data.location || "",
                salary: res.data.salary || "",
                experienceRequired:
                    res.data.experienceRequired || "",
                skillsRequired:
                    res.data.skillsRequired || "",
                companyEmail:
                    res.data.companyEmail || "",
            });

        } catch (err) {
            console.error(err);
            toast.error("Failed to load job");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
  try {

    await API.put(
      `/company/update/${id}`,
      {
        ...form,
        salary: parseFloat(form.salary),
        experienceRequired:
          parseInt(
            form.experienceRequired
          ),
      }
    );

    toast.success(
      "Job updated successfully 🚀"
    );

    navigate("/company/my-jobs");

  } catch (err) {
    console.error(err);

    toast.error(
      "Failed to update job ❌"
    );
  }
};



    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(139,92,246,0.15), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)",
                padding: "50px 20px",
                fontFamily:
                    "'Inter','Poppins',sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow Effects */}
            <div
                style={{
                    position: "absolute",
                    top: "-180px",
                    left: "-180px",
                    width: "400px",
                    height: "400px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    filter: "blur(150px)",
                    opacity: 0.18,
                }}
            />

            <div
                style={{
                    position: "absolute",
                    bottom: "-180px",
                    right: "-180px",
                    width: "400px",
                    height: "400px",
                    background: "#8b5cf6",
                    borderRadius: "50%",
                    filter: "blur(150px)",
                    opacity: 0.18,
                }}
            />

            <div
                style={{
                    maxWidth: "1050px",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* Header */}
                <div
                    style={{
                        marginBottom: "35px",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 18px",
                            borderRadius: "999px",
                            background:
                                "rgba(255,255,255,0.06)",
                            border:
                                "1px solid rgba(255,255,255,0.08)",
                            color: "#cbd5e1",
                            marginBottom: "18px",
                        }}
                    >
                        💼 Recruiter Dashboard
                    </div>

                    <h1
                        style={{
                            color: "white",
                            fontSize: "3rem",
                            fontWeight: "800",
                            marginBottom: "12px",
                            letterSpacing: "-1px",
                        }}
                    >
                        Update a New Job
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "1.05rem",
                            maxWidth: "650px",
                            lineHeight: "1.8",
                        }}
                    >
                        Create opportunities and
                        attract top talent by
                        publishing a professional
                        job listing.
                    </p>
                </div>

                {/* Main Card */}
                <div
                    style={{
                        background:
                            "rgba(255,255,255,0.06)",
                        border:
                            "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "32px",
                        padding: "40px",
                        backdropFilter: "blur(28px)",
                        WebkitBackdropFilter:
                            "blur(28px)",
                        boxShadow:
                            "0 25px 60px rgba(0,0,0,0.35)",
                    }}
                >
                    {/* Form Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        <InputField
                            label="Job Title"
                            name="title"
                            placeholder="Frontend Developer"
                            value={form.title}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Location"
                            name="location"
                            placeholder="Mumbai, India"
                            value={form.location}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Salary"
                            name="salary"
                            type="number"
                            placeholder="80000"
                            value={form.salary}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Experience"
                            name="experienceRequired"
                            type="number"
                            placeholder="2 Years"
                            value={
                                form.experienceRequired
                            }
                            onChange={handleChange}
                        />

                        <InputField
                            label="Skills Required"
                            name="skillsRequired"
                            placeholder="React, Java"
                            value={
                                form.skillsRequired
                            }
                            onChange={handleChange}
                        />

                        <InputField
                            label="Company Email"
                            name="companyEmail"
                            type="email"
                            placeholder="company@email.com"
                            value={
                                form.companyEmail
                            }
                            onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            marginTop: "28px",
                        }}
                    >
                        <label
                            style={{
                                color: "#e2e8f0",
                                fontWeight: "600",
                                display: "block",
                                marginBottom: "12px",
                            }}
                        >
                            Job Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Write a detailed description of the role, responsibilities, and requirements..."
                            value={form.description}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                minHeight: "180px",
                                padding: "20px",
                                borderRadius: "22px",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                                background:
                                    "rgba(255,255,255,0.05)",
                                color: "white",
                                outline: "none",
                                resize: "none",
                                boxSizing:
                                    "border-box",
                                fontSize: "1rem",
                                lineHeight: "1.7",
                            }}
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleUpdate}
                        style={{
                            width: "100%",
                            marginTop: "35px",
                            padding: "18px",
                            border: "none",
                            borderRadius: "22px",
                            background:
                                "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition:
                                "all 0.3s ease",
                            boxShadow:
                                "0 15px 35px rgba(37,99,235,0.3)",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform =
                                "translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform =
                                "translateY(0px)";
                        }}
                    >
                        ✏️ Update Job
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({
    label,
    ...props
}) {
    return (
        <div>
            <label
                style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#e2e8f0",
                    fontWeight: "600",
                }}
            >
                {label}
            </label>

            <input
                {...props}
                style={{
                    width: "100%",
                    padding: "18px",
                    borderRadius: "18px",
                    border:
                        "1px solid rgba(255,255,255,0.08)",
                    background:
                        "rgba(255,255,255,0.05)",
                    color: "white",
                    outline: "none",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    transition:
                        "all 0.25s ease",
                }}
            />
        </div>
    );
}

export default EditJob;