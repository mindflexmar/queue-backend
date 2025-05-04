class SpecializationService {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    async getAllSpecializations() {
      return this.prisma.specialization.findMany();
    }
  
    async getSpecializationByCode(code) {
      return this.prisma.specialization.findUnique({
        where: { code: Number(code) }
      });
    }
  
    async createSpecialization(data) {
      return this.prisma.specialization.create({ data });
    }
  
    async updateSpecialization(code, data) {
      return this.prisma.specialization.update({
        where: { code: Number(code) },
        data
      });
    }
  
    async deleteSpecialization(code) {
      return this.prisma.specialization.delete({
        where: { code: Number(code) }
      });
    }
  }
  
  module.exports = SpecializationService;
  