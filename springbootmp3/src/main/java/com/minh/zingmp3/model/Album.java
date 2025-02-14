package com.minh.zingmp3.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Album  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column
    private String img;
    @ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_artist")
    private Artist artist;
    @Column
    private LocalDate releaseDate;
    @OneToMany(mappedBy = "album",cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
    private Set<Song> songs=new HashSet<>();




}
