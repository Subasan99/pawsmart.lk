"use client";
import Header from "@/components/Header";
import MultipleImagesProps from "@/components/SinglePageImage";
import { useMedicineStore } from "@/store/medicinesStore";
import { useEffect } from "react";
import { getMedicineFilterData } from "../../home/action";

interface Medicine {
  preSignedUrl: string;
  image: string;
  name: string;
}

const Medicines = () => {
  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  useEffect(() => {
    fetchData();
  }, []); // Only fetch data on component mount

  const fetchData = async () => {
    try {
      const medicinesData = await getMedicineFilterData({
        pageSize: 10,
        pageCount: 1,
      });
      setAllMedicines(medicinesData.records); // Ensure correct structure if `medicinesData` contains `records`
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const medicinesData = Array.isArray(medicines)
    ? medicines.map((medicine: Medicine) => ({
        src: medicine.preSignedUrl,
        alt: medicine.image,
        textOverlay: medicine.name,
        label: medicine.name,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  return (
    <div id="medicines" className="pb-8 pt-40">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      <MultipleImagesProps
        title="Medicines"
        description="Discover our range of medicines for your health needs."
        handleClick={handleClick}
        doctors={medicinesData} // Consider renaming `doctors` to something more appropriate like `items` or `images`
      />
    </div>
  );
};

export default Medicines;
