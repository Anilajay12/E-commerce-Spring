package com.vastra.shopping.controller;

import com.vastra.shopping.model.Orders;
import com.vastra.shopping.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
public class OrdersController {


    private static final Logger LOGGER = LoggerFactory.getLogger(OrdersController.class);
    private static final String PATTERN = "------------------------------------------------------";

    private OrderService orderService;

    public OrdersController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping("/orders/{status}")
    public ResponseEntity<List<Orders>> getAllOrders(@PathVariable boolean status){
        LOGGER.info(PATTERN);
        LOGGER.info("Getting All Order Details");
        List<Orders> orders=this.orderService.getAllOrders(status);
        if(orders.isEmpty())
            LOGGER.warn("No Orders found with given status");
        else
            LOGGER.info("Order details fetched successfully");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/orders/{id}/{status}")
    public ResponseEntity<List<Orders>> getUserOrders(@PathVariable Long id,@PathVariable boolean status){
        LOGGER.info(PATTERN);
        LOGGER.info("Fetching User Orders");
        List<Orders> userOrders=this.orderService.getAllOrdersByIdAndStatus(id,status);
        if(userOrders.isEmpty())
            LOGGER.warn("No orders found for this user");
        else
            LOGGER.info("fetched details successfully");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(userOrders,HttpStatus.OK);
    }



    @PostMapping("/placeOrder/{id}")
    public ResponseEntity<Orders> getPlaceOrder(@RequestBody Orders orders,@PathVariable Long id){
        LOGGER.info(PATTERN);
        LOGGER.info("Placing a new order");
        Orders placeOrder = this.orderService.addNewOrders(orders,id);
        if(placeOrder!=null)
            LOGGER.info("Order Placed Successfully");
        else
            LOGGER.warn("Order Cancelled");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(placeOrder,HttpStatus.CREATED);
    }

    @PutMapping("/manageOrder")
    public ResponseEntity<Orders> getUpdateOrder(@RequestBody Orders order){
        LOGGER.info(PATTERN);
        LOGGER.info("Delivering the product");
        Orders updateOrder = this.orderService.updateOrder(order);
        if(updateOrder!=null)
            LOGGER.info("Delivered Successfully");
        else
            LOGGER.warn("There is a problem to deliver the product");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(updateOrder,HttpStatus.OK);
    }
}
