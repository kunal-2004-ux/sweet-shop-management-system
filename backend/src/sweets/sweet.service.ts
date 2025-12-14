import prisma from "../database/prismaClient";

interface CreateSweetInput {
  name: string;
  category: string;
  price: number;
  quantityInStock: number;
}

interface SearchSweetInput {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
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

  async updateSweet(
    sweetId: string,
    updates: Partial<{
      name: string;
      category: string;
      price: number;
      quantityInStock: number;
    }>
  ) {
    return prisma.sweet.update({
      where: { id: sweetId },
      data: updates
    });
  }

  async deleteSweet(sweetId: string) {
    return prisma.sweet.delete({
      where: { id: sweetId }
    });
  }

  async getAllSweets() {
    return prisma.sweet.findMany();
  }

  async searchSweets(filters: SearchSweetInput) {
    return prisma.sweet.findMany({
      where: {
        name: filters.name ? { contains: filters.name } : undefined,
        category: filters.category ?? undefined,
        price: {
          gte: filters.minPrice,
          lte: filters.maxPrice
        }
      }
    });
  }

  async purchaseSweet(sweetId: string, quantity: number = 1) {
    // Validate quantity
    if (!quantity || quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    const sweet = await prisma.sweet.findUnique({
      where: { id: sweetId }
    });

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    if (sweet.quantityInStock < quantity) {
      throw new Error("Insufficient stock available");
    }

    return prisma.sweet.update({
      where: { id: sweetId },
      data: {
        quantityInStock: sweet.quantityInStock - quantity
      }
    });
  }

  async restockSweet(sweetId: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Restock amount must be greater than zero");
    }

    const sweet = await prisma.sweet.findUnique({
      where: { id: sweetId }
    });

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    return prisma.sweet.update({
      where: { id: sweetId },
      data: {
        quantityInStock: sweet.quantityInStock + amount
      }
    });
  }
}
