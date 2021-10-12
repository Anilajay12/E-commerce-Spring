package com.vastra.shopping.repository;

import com.vastra.shopping.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrdersRepository extends JpaRepository<Orders,Long> {

    List<Orders> findOrderByStatus(boolean status);

    List<Orders> findOrdersByUserIdAndStatus(Long userId, boolean status);
}
