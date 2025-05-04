class RequestService {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    async getAllRequests() {
      return this.prisma.request.findMany({
        include: {
          citizen: true,
          specialist: true,
          specialization: true
        }
      });
    }
  
    async getRequestById(id) {
      return this.prisma.request.findUnique({
        where: { id: Number(id) },
        include: {
          citizen: true,
          specialist: true,
          specialization: true
        }
      });
    }
  
    async createRequest(data) {
      return this.prisma.request.create({
        data: {
          ...data,
          status: 'очікує',
          creation_date: new Date()
        }
      });
    }
  
    async updateRequest(id, data) {
      return this.prisma.request.update({
        where: { id: Number(id) },
        data
      });
    }
  
    async deleteRequest(id) {
      return this.prisma.request.delete({
        where: { id: Number(id) }
      });
    }
  }
  module.exports = RequestService; 