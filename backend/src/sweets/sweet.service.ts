import prisma from "../database/prismaClient";

interface CreateSweetInput {
  name: string;
  category: string;
  price: number;
  quantityInStock: number;
}

export class SweetService {
  async addSweetToCatalog(input: CreateSweetInput) {
    if (
      !input.name ||
      !input.category ||
      input.price === undefined ||
      input.quantityInStock === undefined
    ) {
      throw new Error("All sweet details are required");
    }

    return prisma.sweet.create({
      data: {
        name: input.name,
        category: input.category,
        price: input.price,
        quantityInStock: input.quantityInStock
      }
    });
  }
}
