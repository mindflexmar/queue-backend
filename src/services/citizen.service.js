class CitizenService {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    async getAllCitizens() {
      return this.prisma.citizen.findMany({ orderBy: { id: 'asc' } });
    }
  
    async getCitizenById(id) {
      return this.prisma.citizen.findUnique({ where: { id: Number(id) } });
    }
  
    async createCitizen(data) {
      return this.prisma.citizen.create({ data });
    }
  
    async updateCitizen(id, data) {
      return this.prisma.citizen.update({
        where: { id: Number(id) },
        data
      });
    }
  
    async deleteCitizen(id) {
      return this.prisma.citizen.delete({ where: { id: Number(id) } });
    }
  }
  
  module.exports = CitizenService;
  