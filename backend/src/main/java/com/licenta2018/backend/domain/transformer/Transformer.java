package com.licenta2018.backend.domain.transformer;

public interface Transformer<Model,DTO> {
    Model toModel(DTO dto);
    DTO toDTO(Model model);
}
