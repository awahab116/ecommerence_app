import { http, HttpResponse, delay } from "msw";

const handlers = [
  http.get("http://localhost:4000/products/:productId", async (request) => {
    //const url = new URL(request.url);
    const productId = request.params.productId.toString();
    console.log("productId", productId);
    // console.log("request params ",request?.params?.productId)

    // Check if productId is greater than 10 to decide on error response
    if (parseInt(productId ?? "") > 10) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Test Product not found",
      });
    } else {
      // Return a success response for productId <= 10
      return HttpResponse.json({
        id: parseInt(productId ?? ""),
        title: `Test Product ${productId}`,
        price: 1000,
        description: `Test Product ${productId} description`,
        image:
          "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
        category: "Clothes",
      });
    }
  }),

  // Other handlers for different endpoints
  http.get("api/auth/session", async () => {
    // Example response using HttpResponse
    const response = HttpResponse.json({
      id: 1,
      email: "awahab1116@gmail.com",
      name: "Ali",
    });

    return response;
  }),

  http.post("http://localhost:4000/orders", async () => {
    return HttpResponse.json({
      id: 1,
      status: "PROCESSING",
      totalPrice: 1000,
      products: [
        {
          productId: 1,
          quantity: 1,
          price: 1000,
        },
      ],
    });
  }),
];

export { handlers };
