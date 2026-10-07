package br.com.gerenciadorDeAlugueis.service;

import br.com.gerenciadorDeAlugueis.dto.ImovelDto;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.repositores.DespesaRpo;
import br.com.gerenciadorDeAlugueis.repositores.EnderecoRpo;
import br.com.gerenciadorDeAlugueis.repositores.ImovelRpo;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ImovelService implements ImovelRpo, Serializable {

	@Override
	public List<Imovel> findAll(Sort sort) {
		return List.of();
	}

	@Override
	public boolean existsByNomeImovel(String nome) {
		return false;
	}

	@Override
	public Optional<Imovel> findAllByIdImovel(int id) {
		return Optional.empty();
	}

	@Override
	public Imovel findByIdImovel(int id) {
		return null;
	}

	@Override
	public void flush() {

	}

	@Override
	public <S extends Imovel> S saveAndFlush(S entity) {
		return null;
	}

	@Override
	public <S extends Imovel> List<S> saveAllAndFlush(Iterable<S> entities) {
		return List.of();
	}

	@Override
	public void deleteAllInBatch(Iterable<Imovel> entities) {

	}

	@Override
	public void deleteAllByIdInBatch(Iterable<Long> longs) {

	}

	@Override
	public void deleteAllInBatch() {

	}

	@Override
	public Imovel getOne(Long aLong) {
		return null;
	}

	@Override
	public Imovel getById(Long aLong) {
		return null;
	}

	@Override
	public Imovel getReferenceById(Long aLong) {
		return null;
	}

	@Override
	public <S extends Imovel> Optional<S> findOne(Example<S> example) {
		return Optional.empty();
	}

	@Override
	public <S extends Imovel> List<S> findAll(Example<S> example) {
		return List.of();
	}

	@Override
	public <S extends Imovel> List<S> findAll(Example<S> example, Sort sort) {
		return List.of();
	}

	@Override
	public <S extends Imovel> Page<S> findAll(Example<S> example, Pageable pageable) {
		return null;
	}

	@Override
	public <S extends Imovel> long count(Example<S> example) {
		return 0;
	}

	@Override
	public <S extends Imovel> boolean exists(Example<S> example) {
		return false;
	}

	@Override
	public <S extends Imovel, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
		return null;
	}

	@Override
	public <S extends Imovel> S save(S entity) {
		return null;
	}

	@Override
	public <S extends Imovel> List<S> saveAll(Iterable<S> entities) {
		return List.of();
	}

	@Override
	public Optional<Imovel> findById(Long aLong) {
		return Optional.empty();
	}

	@Override
	public boolean existsById(Long aLong) {
		return false;
	}

	@Override
	public List<Imovel> findAll() {
		return List.of();
	}

	@Override
	public List<Imovel> findAllById(Iterable<Long> longs) {
		return List.of();
	}

	@Override
	public long count() {
		return 0;
	}

	@Override
	public void deleteById(Long aLong) {

	}

	@Override
	public void delete(Imovel entity) {

	}

	@Override
	public void deleteAllById(Iterable<? extends Long> longs) {

	}

	@Override
	public void deleteAll(Iterable<? extends Imovel> entities) {

	}

	@Override
	public void deleteAll() {

	}

	@Override
	public Page<Imovel> findAll(Pageable pageable) {
		return null;
	}
}
