package com.vastra.shopping.service;

import com.vastra.shopping.model.Orders;

import java.util.List;

public interface OrderService {

    List<Orders> getAllOrders(boolean status);


    Orders addNewOrders(Orders orders,Long userId);

    Orders updateOrder(Orders order);

    List<Orders> getAllOrdersByIdAndStatus(Long userId, boolean status);
}
