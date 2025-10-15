import { useState, useEffect } from 'react';
import  VisitModel from '../models/VisitModel';

const VeterinaryAnimalViewModel = (petId) => {
  const [visits, setVisits] = useState([]);
  const [expandedVisitId, setExpandedVisitId] = useState(null);
  const visitModel = new VisitModel()


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('visit: ', petId);
        const visitsData = await visitModel.fetchVisits(petId);
        
        const visitsWithDetails = await Promise.all(
          visitsData.map(async (visit) => {
            const details = await visitModel.fetchVisitDetails(petId, visit.id);
            return { ...visit, ...details };
          })
        );
        setVisits(visitsWithDetails);
        
      } catch (error) {
        console.error("Error loading visits:", error);
      }
    };

    fetchData();
    
  }, [petId]);

  const toggleExpand = (visitId) => {
    setExpandedVisitId(expandedVisitId === visitId ? null : visitId);
  };

  return { visits, expandedVisitId, toggleExpand };
};

export default VeterinaryAnimalViewModel
