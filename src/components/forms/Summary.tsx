import Image from "next/image";

const Summary = ({ formData, img }: { formData: any; img: any }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review and Submit</h2>
      <div className="flex my-6 gap-32">
        <div className="w-36 h-36 rounded-full bg-slate-500 overflow-hidden ">
          <Image
            src={img?.secure_url || "/noAvatar.png"}
            alt=""
            width={205}
            height={205}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold text-lg text-gray-500">GRADE</p>
            <p>{formData?.gradeId}</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-500">CLASS</p>
            <p>{formData?.classId}</p>
          </div>
        </div>
      </div>

      <h3 className="bg-irwinSky font-bold text-lg p-2">
        Authentication Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-[138px] ">
          <p className="font-bold text-lg">Username:</p>
          <p className="text-lg">{formData?.username}</p>
        </div>
        <div className="mt-4 flex gap-[140px]  ">
          <p className="font-bold text-lg">Password:</p>
          <p className="text-lg">{formData?.password}</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Personal Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-32 ">
          <p className="font-bold text-lg">First Name:</p>
          <p className="text-lg">{formData?.firstName}</p>
        </div>
        <div className="mt-4 flex gap-[105px] ">
          <p className="font-bold text-lg">Middle Name:</p>
          <p className="text-lg">{formData?.middleName || "---"}</p>
        </div>
        <div className="mt-4 flex gap-32 ">
          <p className="font-bold text-lg">Last Name:</p>
          <p className="text-lg">{formData?.lastName}</p>
        </div>
        <div className="mt-4 flex gap-[155px] ">
          <p className="font-bold text-lg">Gender:</p>
          <p className="text-lg">{formData?.sex}</p>
        </div>
        <div className="mt-4 flex gap-[110px] ">
          <p className="font-bold text-lg">Date of Birth:</p>
          <p className="text-lg">
            {formData?.birthDay.toISOString().split("T")[0]}
          </p>
        </div>
        <div className="mt-4 flex gap-[122px]  ">
          <p className="font-bold text-lg">Nationality:</p>
          <p className="text-lg">{formData?.nationality}</p>
        </div>
        <div className="mt-4 flex gap-[122px] ">
          <p className="font-bold text-lg">National ID:</p>
          <p className="text-lg">{formData?.nationalId}</p>
        </div>
        <div className="mt-4 flex gap-[125px]  ">
          <p className="font-bold text-lg">Parent UID:</p>
          <p className="text-lg">{formData?.parentId}</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Contact Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-[92px] ">
          <p className="font-bold text-lg">Phone Number:</p>
          <p className="text-lg">{formData?.phoneNumber || "---"}</p>
        </div>
        <div className="mt-4 flex gap-[92px] ">
          <p className="font-bold text-lg">Postal Address:</p>
          <p className="text-lg">{formData?.postalAddress}</p>
        </div>
        <div className="mt-4 flex gap-[52px] ">
          <p className="font-bold text-lg">Residence Address:</p>
          <p className="text-lg">{formData?.residenceAddress}</p>
        </div>
        <div className="mt-4 flex gap-[90px] ">
          <p className="font-bold text-lg">Digital Address:</p>
          <p className="text-lg">{formData?.digitalAddress}</p>
        </div>
        <div className="mt-4 flex gap-[100px] ">
          <p className="font-bold text-lg">Email Address:</p>
          <p className="text-lg">{formData?.emailAddress || "---"}</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Guardian Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-[132px] ">
          <p className="font-bold text-lg">Full Name:</p>
          <p className="text-lg">{formData?.fullNameOfGuardian}</p>
        </div>
        <div className="mt-4 flex gap-[148px]">
          <p className="font-bold text-lg">Relation:</p>
          <p className="text-lg">{formData?.relationOfGuardian}</p>
        </div>
        <div className="mt-4 flex gap-[88px] ">
          <p className="font-bold text-lg">Phone Number:</p>
          <p className="text-lg">{formData?.phoneNumberOfGuardian}</p>
        </div>

        <div className="mt-4 flex gap-[95px] ">
          <p className="font-bold text-lg">Email Address:</p>
          <p className="text-lg">{formData?.emailOfGuardian || "---"}</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Medical History
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-[112px] ">
          <p className="font-bold text-lg">Blood Group:</p>
          <p className="text-lg">{formData?.bloodGroup}</p>
        </div>
        <div className="mt-4 flex gap-[150px] ">
          <p className="font-bold text-lg">Sickling:</p>
          <p className="text-lg">AA</p>
        </div>
        <div className="mt-4 flex gap-[140px]">
          <p className="font-bold text-lg">Allergies:</p>
          <p className="text-lg">{formData?.allergies}</p>
        </div>
        <div className="mt-4 flex gap-[60px] ">
          <p className="font-bold text-lg">Health Conditions:</p>
          <p className="text-lg">{formData?.healthConditions}</p>
        </div>
        <div className="mt-4 flex gap-[110px] ">
          <p className="font-bold text-lg">Medications:</p>
          <p className="text-lg">{formData?.medications}</p>
        </div>
        <p className="font-bold text-lg my-2">Immunization:</p>
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-irwinSky text-left ">
              <th className="p-2 border-b border-gray-200">Vaccine Name</th>
              <th className="p-2 border-b border-gray-200">Vaccine Type</th>
              <th className="p-2 border-b border-gray-200">Vaccine Dose</th>
              <th className="p-2 border-b border-gray-200">
                Date Administered
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-100 transition-colors">
              <td className="p-2 border-b border-gray-200">
                {formData?.vaccineName || "---"}
              </td>
              <td className="p-2 border-b border-gray-200">
                {formData?.vaccineType || "---"}
              </td>
              <td className="p-2 border-b border-gray-200">
                {formData?.vaccineDose || "---"}
              </td>
              <td className="p-2 border-b border-gray-200">
                {formData?.vaccineDate.toISOString().split("T")[0] || "---"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
