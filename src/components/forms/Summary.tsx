const Summary = ({ formData }: { formData: any }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review and Submit</h2>
      <h3 className="bg-irwinSky font-bold text-lg p-2">
        Authentication Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Username:</p>
          <p className="text-lg">john</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Password:</p>
          <p className="text-lg">john</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Personal Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">First Name:</p>
          <p className="text-lg">John</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Middle Name:</p>
          <p className="text-lg">-</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Last Name:</p>
          <p className="text-lg">Doe</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Gender:</p>
          <p className="text-lg">MALE</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Date of Birth:</p>
          <p className="text-lg">17/03/1992</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Nationality:</p>
          <p className="text-lg">Ghanaian</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">National ID:</p>
          <p className="text-lg">GHA-002-2222-01</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Parent UID:</p>
          <p className="text-lg">parentId1</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Contact Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Phone Number:</p>
          <p className="text-lg">024000000</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Postal Address:</p>
          <p className="text-lg">P.O. Box CO 1222</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Residence Address:</p>
          <p className="text-lg">TMA Zenu 35</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Digital Address:</p>
          <p className="text-lg">GB-10000-22</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Email Address:</p>
          <p className="text-lg">john@testmail.com</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Guardian Information
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Full Name:</p>
          <p className="text-lg">Jane Doe</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Relation:</p>
          <p className="text-lg">Mother</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Phone Number:</p>
          <p className="text-lg">0241111111</p>
        </div>

        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Email Address:</p>
          <p className="text-lg">jane@testmail.com</p>
        </div>
      </div>
      <h3 className="bg-irwinSky font-bold text-lg p-2 mt-4">
        Medical History
      </h3>
      <div className="p-2">
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Blood Group:</p>
          <p className="text-lg">O+</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Sickling:</p>
          <p className="text-lg">AA</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Allergies:</p>
          <p className="text-lg">None</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Health Conditions:</p>
          <p className="text-lg">None</p>
        </div>
        <div className="mt-4 flex gap-16 ">
          <p className="font-bold text-lg">Medications:</p>
          <p className="text-lg">None</p>
        </div>
        <p>Immunization</p>
        <table>
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Vaccine Type</th>
              <th>Vaccine Dose</th>
              <th>Date Administered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Astrazenica</td>
              <td>Covid 19</td>
              <td>2</td>
              <td>7-12-2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
