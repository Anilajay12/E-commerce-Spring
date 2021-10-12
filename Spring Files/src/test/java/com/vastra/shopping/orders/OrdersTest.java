package com.vastra.shopping.orders;

import com.vastra.shopping.model.Orders;
import com.vastra.shopping.repository.OrdersRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@DataJpaTest
public class OrdersTest {
    @Autowired
    private OrdersRepository ordersRepository;

    @Test
    public void placeNewOrder(){
        Orders orders=new Orders();
        orders.setUserId(1L);
        orders.setProductName("T-shirt");
        orders.setStatus(false);
        orders.setDescription("Good Quality Product");
        orders.setPrice(750.0);
        orders.setQuantity(5);
        orders.setTotal(orders.getPrice() * orders.getQuantity());
        assertNotNull(ordersRepository.save(orders));
    }

    @Test
    public void deleteOrder(){
        Orders orders=new Orders();
        orders.setUserId(1L);
        orders.setProductName("T-shirt");
        orders.setStatus(false);
        orders.setDescription("Good Quality Product");
        orders.setPrice(750.0);
        orders.setQuantity(5);
        orders.setTotal(orders.getPrice() * orders.getQuantity());
        assertNotNull(ordersRepository.save(orders));
        ordersRepository.delete(orders);
    }

    @Test
    public void allOrders(){
        List<Orders> ordersList = new ArrayList<>();
        ordersList.add(new Orders(1L,"T-shirt",200.0,"Better Product",2,200.0*2,false));
        ordersList.add(new Orders(1L,"ABC",500.0,"Better Product",3,500.0*3,false));
        ordersList.add(new Orders(1L,"XYZ",700.0,"Better Product",5,700.0*5,false));
        assertEquals(3,(ordersRepository.saveAll(ordersList)).size());
    }

    @Test
    public void ordersByUserId(){
        List<Orders> ordersList = new ArrayList<>();
        ordersList.add(new Orders(1L,"T-shirt",200.0,"Better Product",2,200.0*2,false));
        ordersList.add(new Orders(1L,"ABC",500.0,"Better Product",3,500.0*3,false));
        ordersList.add(new Orders(1L,"XYZ",700.0,"Better Product",5,700.0*5,false));
        ordersRepository.saveAll(ordersList);
        assertEquals(3,ordersRepository.findOrdersByUserIdAndStatus(1L,false).size());
    }

    @Test
    public void findOrder(){
        List<Orders> ordersList = new ArrayList<>();
        ordersList.add(new Orders(1L,"T-shirt",200.0,"Better Product",2,200.0*2,false));
        ordersList.add(new Orders(1L,"ABC",500.0,"Better Product",3,500.0*3,true));
        ordersList.add(new Orders(1L,"XYZ",700.0,"Better Product",5,700.0*5,true));
        ordersList = ordersRepository.saveAll(ordersList);
        assertEquals(2,ordersRepository.findOrderByStatus(true).size());
    }
}
