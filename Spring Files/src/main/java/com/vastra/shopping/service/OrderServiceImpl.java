package com.vastra.shopping.service;

import com.vastra.shopping.model.Orders;
import com.vastra.shopping.repository.OrdersRepository;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrdersRepository orderRepository;

    public OrderServiceImpl(OrdersRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    @Override
    public List<Orders> getAllOrders(boolean status) {
        return this.orderRepository.findOrderByStatus(status);
    }

    @Override
    public Orders addNewOrders(Orders orders, Long userId) {
        orders.setUserId(userId);
        return this.orderRepository.save(orders);
    }

    @Override
    public Orders updateOrder(Orders order) {
        order.setStatus(true);
        return this.orderRepository.save(order);
    }

    @Override
    public List<Orders> getAllOrdersByIdAndStatus(Long userId, boolean status) {
        return this.orderRepository.findOrdersByUserIdAndStatus(userId,status);
    }


}
