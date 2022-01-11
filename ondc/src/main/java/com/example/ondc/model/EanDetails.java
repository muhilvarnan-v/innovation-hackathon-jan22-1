package com.example.ondc.model;


import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@MappedSuperclass
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EanDetails {

    String title;

    String imageLink;

    String description;

    @Column(name = "created_at")
    @CreationTimestamp
    Timestamp createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    Timestamp updatedAt;

}
