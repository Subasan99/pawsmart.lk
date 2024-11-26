// import React from 'react';

// interface Specialist {
//   name: string;
//   specializationName: string;
//   preSignedUrl: string; 
// }

// interface SpecialistCardProps {
//   specialist: Specialist;
//   onClick?: () => void;
// }

// const SpecialistCard = ({ specialist, onClick }: SpecialistCardProps) => {
//     console.log("specialist",specialist);
//   const defaultImage = '/department.png';

//   return (
//     <div
//       className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="flex flex-col items-center text-center space-y-4">
//         <div className="w-16 h-16 relative">
//           <img
//             src={specialist.preSignedUrl?specialist.preSignedUrl:defaultImage}
//             alt={specialist.name}
//             className="w-full h-full object-cover rounded-full"
//           />
//         </div>
//         <h3 className="text-lg font-medium text-gray-700">{specialist.name}</h3>
//         <p className="text-sm text-gray-600 max-w-xs">{specialist.specializationName}</p>
//       </div>
//     </div>
//   );
// };

// export default SpecialistCard;


import { Stethoscope } from 'lucide-react';
import React from 'react';

interface Specialist {
  name: string;
  specializationName: string;
  preSignedUrl: string; 
}

interface SpecialistCardProps {
  specialist: Specialist;
  onClick?: () => void;
}

const SpecialistCard = ({ specialist, onClick }: SpecialistCardProps) => {
 
  const defaultImage = '/department.png';

  return (
    <div
      className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-4 relative">
        <div className="w-16 h-16 relative">
   
          <img
            src={specialist.preSignedUrl ? specialist.preSignedUrl : defaultImage}
            alt={specialist.name}
            className="w-full h-full object-cover rounded-full"
          />
       
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
            <Stethoscope className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-700">{specialist.name}</h3>
        <p className="text-sm text-gray-600 max-w-xs">{specialist.specializationName}</p>
      </div>
    </div>
  );
};

export default SpecialistCard;
