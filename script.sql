CREATE SCHEMA IF NOT EXISTS `file_management` DEFAULT CHARACTER SET latin1 ;
USE `file_management` ;

-- -----------------------------------------------------
-- Table `file_management`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `file_management`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `created_date` datetime default now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------

-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `file_management`.`document` (
  `iddocument` INT(11) NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(100) NULL DEFAULT NULL,
  `extension` VARCHAR(45) NULL DEFAULT NULL,
  `originaname` VARCHAR(100) NULL DEFAULT NULL,
  `updatedby` VARCHAR(45) NULL DEFAULT NULL,
  `updateddate` datetime default now(),
  `user_id` INT NOT NULL,
  PRIMARY KEY (`iddocument`, `user_id`),
  INDEX `fk_document_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_document_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `file_management`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;
