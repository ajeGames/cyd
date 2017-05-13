/*
 * StoryTime API
 * Backend for managing choose-your-own-destiny style stories.
 *
 * OpenAPI spec version: 0.3.0
 * Contact: saynotospam@ajegames.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.model.ChapterSign;
import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.*;

/**
 * Chapter
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class Chapter   {
  @JsonProperty("chapterId")
  private Integer chapterId = null;

  @JsonProperty("title")
  private String title = null;

  @JsonProperty("prose")
  private String prose = null;

  @JsonProperty("signpost")
  private List<ChapterSign> signpost = new ArrayList<ChapterSign>();

  public Chapter chapterId(Integer chapterId) {
    this.chapterId = chapterId;
    return this;
  }

   /**
   * Get chapterId
   * @return chapterId
  **/
  @JsonProperty("chapterId")
  @ApiModelProperty(value = "")
  public Integer getChapterId() {
    return chapterId;
  }

  public void setChapterId(Integer chapterId) {
    this.chapterId = chapterId;
  }

  public Chapter title(String title) {
    this.title = title;
    return this;
  }

   /**
   * Get title
   * @return title
  **/
  @JsonProperty("title")
  @ApiModelProperty(value = "")
  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Chapter prose(String prose) {
    this.prose = prose;
    return this;
  }

   /**
   * Get prose
   * @return prose
  **/
  @JsonProperty("prose")
  @ApiModelProperty(value = "")
  public String getProse() {
    return prose;
  }

  public void setProse(String prose) {
    this.prose = prose;
  }

  public Chapter signpost(List<ChapterSign> signpost) {
    this.signpost = signpost;
    return this;
  }

  public Chapter addSignpostItem(ChapterSign signpostItem) {
    this.signpost.add(signpostItem);
    return this;
  }

   /**
   * Get signpost
   * @return signpost
  **/
  @JsonProperty("signpost")
  @ApiModelProperty(value = "")
  public List<ChapterSign> getSignpost() {
    return signpost;
  }

  public void setSignpost(List<ChapterSign> signpost) {
    this.signpost = signpost;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Chapter chapter = (Chapter) o;
    return Objects.equals(this.chapterId, chapter.chapterId) &&
        Objects.equals(this.title, chapter.title) &&
        Objects.equals(this.prose, chapter.prose) &&
        Objects.equals(this.signpost, chapter.signpost);
  }

  @Override
  public int hashCode() {
    return Objects.hash(chapterId, title, prose, signpost);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Chapter {\n");
    
    sb.append("    chapterId: ").append(toIndentedString(chapterId)).append("\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    prose: ").append(toIndentedString(prose)).append("\n");
    sb.append("    signpost: ").append(toIndentedString(signpost)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
