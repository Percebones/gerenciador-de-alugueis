package com.gerenciador_de_alugueis.model;

import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
@Table(name = "despesa")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_despesa")
    private int idDespesa;

    @OneToOne(mappedBy = "despesa")
    private Imovel imovel;

    @Column(name = "iptu_imovel")
    private BigInteger iptuImovel;

}
