import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { isValidUrl } from "./utils"; // A utility function to validate URLs

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const position = watch("position");
  const additionalSkills = [
    "JavaScript",
    "React",
    "Figma",
    "Mangement",
    "Mern Stack",
  ];

  const onSubmit = (data) => {
    setFormData(data);
    console.log(data);
    if (data) {
      const [datePart, timePart] = data.interviewTime.split("T");
      setDate(datePart);
      setTime(timePart);
    } else {
      setDate("");
      setTime("");
    }
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-slate-100 h-[100vh]">
      {!formData ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mx-auto w-1/2"
        >
          <h2 className="text-2xl font-bold mb-4">Job Application Form</h2>
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              className="w-full p-2 border shadow-md rounded-md"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              className="w-full p-2 border shadow-md rounded-md"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              className="w-full p-2 border shadow-md rounded-md"
              type="number"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Applying for Position</label>
            <select
              className="w-full p-2 border shadow-md rounded-md"
              {...register("position", { required: "Position is required" })}
            >
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.position && (
              <p className="text-red-500">{errors.position.message}</p>
            )}
          </div>

          {(position === "Developer" || position === "Designer") && (
            <div>
              <label className="block mb-1">Relevant Experience (Years)</label>
              <input
                className="w-full p-2 border shadow-md rounded-md"
                type="number"
                {...register("experience", {
                  required: "Relevant Experience is required",
                  min: {
                    value: 1,
                    message: "Experience must be greater than 0",
                  },
                })}
              />
              {errors.experience && (
                <p className="text-red-500">{errors.experience.message}</p>
              )}
            </div>
          )}

          {position === "Designer" && (
            <div>
              <label className="block mb-1">Portfolio URL</label>
              <input
                className="w-full p-2 border shadow-md rounded-md"
                type="text"
                {...register("portfolioUrl", {
                  required: "Portfolio URL is required",
                  validate: (value) => isValidUrl(value) || "Invalid URL",
                })}
              />
              {errors.portfolioUrl && (
                <p className="text-red-500">{errors.portfolioUrl.message}</p>
              )}
            </div>
          )}

          {position === "Manager" && (
            <div>
              <label className="block mb-1 shadow-md rounded-md">
                Management Experience
              </label>
              <textarea
                className="w-full p-2 border"
                {...register("managementExperience", {
                  required: "Management Experience is required",
                })}
              ></textarea>
              {errors.managementExperience && (
                <p className="text-red-500">
                  {errors.managementExperience.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block mb-1">Additional Skills</label>
            {additionalSkills.map((skill) => (
              <div key={skill} className="flex  items-center">
                <input
                  type="checkbox"
                  className="mr-2 shadow-md rounded-md"
                  {...register("additionalSkills", {
                    required: "At least one skill must be selected",
                  })}
                  value={skill}
                />
                <label>{skill}</label>
              </div>
            ))}
            {errors.additionalSkills && (
              <p className="text-red-500">{errors.additionalSkills.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Preferred Interview Time</label>
            <input
              className="w-full p-2 border shadow-md rounded-md"
              type="datetime-local"
              {...register("interviewTime", {
                required: "Preferred Interview Time is required",
              })}
            />
            {errors.interviewTime && (
              <p className="text-red-500">{errors.interviewTime.message}</p>
            )}
          </div>

          <button className="w-full bg-slate-400 text-white p-2 mt-4 hover:bg-slate-600">
            Submit
          </button>
        </form>
      ) : (
        <div className="border-2 mt-20 w-5/6 mx-auto p-6 space-y-5 shadow-lg   bg-slate-50 hover:bg-slate-300 ">
          <h1 class="text-2xl font-semibold text-gray-800 lg:text-3xl ">
            Application Sumbitted!! Here's Summary.
          </h1>
          <p>
            <strong>Full Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {formData.phoneNumber}
          </p>
          <p>
            <strong>position:</strong> {formData.position}
          </p>
          {formData.position === "Designer" && (
            <p>
              <strong>portfolio Url:</strong>{" "}
              <a className="hover:font-semibold " href={formData.portfolioUrl}>
                {formData.portfolioUrl}
              </a>
            </p>
          )}
          <p>
            <strong>Additional Skills:</strong>{" "}
            {formData.additionalSkills.map((item) => `${item}, `)}
          </p>
          {formData.position === "Designer" ||
            (formData.position === "Developer" && (
              <p>
                <strong>Experience:</strong> {formData.experience} years
              </p>
            ))}

          <p>
            <strong>Interview Time:</strong> {date} at time {time}
          </p>
          {formData.position === "Manager" && (
            <p>
              <strong>Management Experience:</strong>{" "}
              {formData.managementExperience} years
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
