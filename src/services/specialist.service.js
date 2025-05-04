class SpecialistService {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    async getAllSpecialists() {
      return this.prisma.specialist.findMany({
        include: {
          specializations: {
            include: {
              specialization: true
            }
          }
        }
      });
    }
  
    async getSpecialistById(id) {
      return this.prisma.specialist.findUnique({
        where: { id: Number(id) },
        include: {
          specializations: {
            include: {
              specialization: true
            }
          }
        }
      });
    }
  
    async createSpecialist(data) {
      return this.prisma.specialist.create({
        data: {
          name: data.name,
          position: data.position,
          specializations: {
            create: data.specializationCodes.map(code => ({
              specialization: {
                connect: { code }
              }
            }))
          }
        }
      });
    }
  
    async updateSpecialist(id, data) {
      return this.prisma.specialist.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          position: data.position,
          specializations: {
            deleteMany: {},
            create: data.specializationCodes.map(code => ({
              specialization: {
                connect: { code }
              }
            }))
          }
        }
      });
    }
  
    async deleteSpecialist(id) {
      return this.prisma.specialist.delete({
        where: { id: Number(id) }
      });
    }
  }
  
  module.exports = SpecialistService;
  